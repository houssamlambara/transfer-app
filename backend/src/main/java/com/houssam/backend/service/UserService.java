package com.houssam.backend.service;

import com.houssam.backend.dto.responseDTO.UserResponseDTO;

import java.util.List;

public interface UserService {
    List<UserResponseDTO> getAllUsers();
}
