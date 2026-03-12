package com.houssam.backend.mapper;

import com.houssam.backend.dto.requestDTO.TransferRequestDTO;
import com.houssam.backend.dto.responseDTO.TransferResponseDTO;
import com.houssam.backend.entity.Transfer;
import org.springframework.stereotype.Component;

@Component
public class TransferMapper {

    public Transfer toEntity(TransferRequestDTO request) {
        return Transfer.builder()
                .sender(request.getSender())
                .receiver(request.getReceiver())
                .amount(request.getAmount())
                .build();
    }

    public TransferResponseDTO toResponseDTO(Transfer transfer) {
        return TransferResponseDTO.builder()
                .id(transfer.getId())
                .sender(transfer.getSender())
                .receiver(transfer.getReceiver())
                .amount(transfer.getAmount())
                .status(transfer.getStatus())
                .createdAt(transfer.getCreatedAt())
                .build();
    }
}

