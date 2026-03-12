package com.houssam.backend.mapper;

import com.houssam.backend.dto.responseDTO.TransferResponseDTO;
import com.houssam.backend.dto.responseDTO.UserResponseDTO;
import com.houssam.backend.entity.Transfer;
import com.houssam.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class TransferMapper {

    public TransferResponseDTO toResponseDTO(Transfer transfer) {
        return TransferResponseDTO.builder()
                .id(transfer.getId())
                .sender(mapUserToDTO(transfer.getSender()))
                .receiver(mapUserToDTO(transfer.getReceiver()))
                .amount(transfer.getAmount())
                .status(transfer.getStatus())
                .createdAt(transfer.getCreatedAt())
                .build();
    }

    private UserResponseDTO mapUserToDTO(User user) {
        if (user == null) return null;
        return UserResponseDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .build();
    }
}
