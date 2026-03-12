package com.houssam.backend.dto.responseDTO;

import com.houssam.backend.enums.TransferStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransferResponseDTO {

    private String id;
    private UserResponseDTO sender;
    private UserResponseDTO receiver;
    private double amount;
    private TransferStatus status;
    private LocalDateTime createdAt;
}
