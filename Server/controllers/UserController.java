package com.giree.todo.controllers;

import com.giree.todo.models.User;
import com.giree.todo.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<?> findUserByEmail(@PathVariable(name = "email") String email) {
        return userService.findUserByEmail(email);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Principal principal) {
        OAuth2AuthenticationToken oauthToken =
                (OAuth2AuthenticationToken) principal;
        String email = oauthToken.getPrincipal().getAttribute("email");
        String name = oauthToken.getPrincipal().getAttribute("name");

        User user = userService.findOrCreateUser(name, email);

        return ResponseEntity.ok("Welcome " + user.getName() + "! You are logged in with email: " + user.getEmail());
    }

}
