package com.giree.todo.services;

import com.giree.todo.dtos.TaskResponse;
import com.giree.todo.dtos.TaskUpdateDto;
import com.giree.todo.models.Task;
import com.giree.todo.models.User;
import com.giree.todo.repos.TaskRepo;
import com.giree.todo.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserService userService;

    public ResponseEntity<?> getTaskById(Integer id) {
        TaskResponse res;

        if (taskRepo.existsById(id)) {
            res = new TaskResponse(true, "Found",
                    taskRepo.findById(id).orElse(null));
            return ResponseEntity.ok(res);
        }
        res = new TaskResponse(false, "Not found");
        return ResponseEntity.badRequest().body(res);
    }

    public ResponseEntity<?> addTask(Task task, String email) {
        TaskResponse res;
        User user = userRepo.findByEmail(email);

        if (taskRepo.existsByTaskTitleIgnoreCase(task.getTaskTitle())) {
            res = new TaskResponse(false, "Already found");
            return ResponseEntity.badRequest().body(res);
        }
        res = new TaskResponse(true, "Added", taskRepo.save(task));
        user.getTasks().add(res.getData().getTaskId());
        userRepo.save(user);

        return ResponseEntity.ok(res);
    }

    public ResponseEntity<?> markAsCompleted(Integer id) {
        TaskResponse res;

        Optional<Task> t = taskRepo.findById(id);
        if (t.isPresent()) {
            Task update = t.get();

            update.setCompleted(!update.isCompleted());

            res = new TaskResponse(true, "Updated", taskRepo.save(update));

            return ResponseEntity.ok(res);
        }
        res = new TaskResponse(false, "Task not found");

        return ResponseEntity.badRequest().body(res);
    }

    public ResponseEntity<?> updateTask(Integer id, TaskUpdateDto update) {

        TaskResponse res;
        Optional<Task> t = taskRepo.findById(id);
        if (t.isPresent()) {
            Task task = t.get();
            task.setTaskTitle(update.getTaskTitle());
            task.setTask(update.getTask());

            res = new TaskResponse(true, "Updated", taskRepo.save(task));

            return ResponseEntity.ok(res);
        }

        res = new TaskResponse(false, "Task not found");

        return ResponseEntity.badRequest().body(res);
    }

    public ResponseEntity<?> deleteTask(Integer id, String email) {
        TaskResponse res;
        Optional<Task> t = taskRepo.findById(id);
        if (t.isPresent()) {
            User user = userRepo.findByEmail(email);
            taskRepo.deleteById(id);
            res = new TaskResponse(true, "Deleted");

            user.getTasks().removeIf(tId -> Objects.equals(tId, id));
            userRepo.save(user);

            return ResponseEntity.ok(res);
        }
        res = new TaskResponse(false, "Task not found");
        return ResponseEntity.badRequest().body(res);
    }

    public ResponseEntity<?> allTasks(Principal principal) {

        User user = userService.getByEmailFromToken(principal);

        List<Task> tasks = new ArrayList<>();

        for (Integer taskId : user.getTasks()) {
            if (taskRepo.existsById(taskId)) {
                tasks.add(taskRepo.findById(taskId).get());
            }
        }

        return ResponseEntity.ok(tasks);

    }
}
