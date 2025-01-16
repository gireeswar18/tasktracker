package com.giree.todo.controllers;

import com.giree.todo.dtos.TaskUpdateDto;
import com.giree.todo.models.Task;
import com.giree.todo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") Integer id) {
        return taskService.getTaskById(id);
    }

    @PostMapping("/add/{email}")
    public ResponseEntity<?> addTask(@RequestBody Task task, @PathVariable String email) {
        return taskService.addTask(task, email);
    }

    @PostMapping("/mark/{id}")
    public ResponseEntity<?> mark(@PathVariable(name = "id") Integer id) {
        return taskService.markAsCompleted(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Integer id, @RequestBody TaskUpdateDto taskUpdateDto) {
        return taskService.updateTask(id, taskUpdateDto);
    }

    @DeleteMapping("/delete/{email}/{id}")
    public ResponseEntity<?> delete(@PathVariable String email, @PathVariable(name = "id") Integer id) {
        return taskService.deleteTask(id, email);
    }

    @GetMapping("/all")
    public ResponseEntity<?> allTasks(Principal principal) {
        return taskService.allTasks(principal);
    }
}
