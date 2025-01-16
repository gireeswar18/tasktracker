package com.giree.todo.services;

import com.giree.todo.models.User;
import com.giree.todo.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User findOrCreateUser(String username, String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setName(username);
            user.setEmail(email);
            return userRepo.save(user);
        }
        return user;
    }
    public User getByEmailFromToken(Principal principal) {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) principal;
        User user = userRepo.findByEmail(token.getPrincipal().getAttribute("email"));
        return user;
    }

    public ResponseEntity<?> findUserByEmail(String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("user not found");
        }
        return ResponseEntity.ok(user);
    }
}
