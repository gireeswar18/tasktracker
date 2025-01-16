package com.giree.todo.repos;

import com.giree.todo.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Task, Integer> {

    boolean existsByTaskTitleIgnoreCase(String title);

}
