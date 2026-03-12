package com.houssam.backend.controller;

import com.houssam.backend.dto.responseDTO.UserResponseDTO;
import com.houssam.backend.response.ApiResponse;
import com.houssam.backend.repository.UserRepository;
import com.houssam.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getAllUsers() {
        return ResponseEntity.ok(new ApiResponse<>("Utilisateurs récupérés avec succès", userService.getAllUsers()));
    }
}
