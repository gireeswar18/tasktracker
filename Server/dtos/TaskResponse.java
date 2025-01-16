package com.giree.todo.dtos;

import com.giree.todo.models.Task;
import lombok.Data;

@Data
public class TaskResponse {

    private boolean success;
    private String message;
    private Task data;


    public TaskResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public TaskResponse(boolean success, String message, Task data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
