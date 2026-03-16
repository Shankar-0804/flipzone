package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.User;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);   // update method added

    void deleteUser(Long id);

}