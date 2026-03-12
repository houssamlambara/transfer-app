package com.houssam.backend.controller;

import com.houssam.backend.dto.requestDTO.TransferRequestDTO;
import com.houssam.backend.dto.responseDTO.TransferResponseDTO;
import com.houssam.backend.enums.TransferStatus;
import com.houssam.backend.response.ApiResponse;
import com.houssam.backend.service.TransferService;
import jakarta.validation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    @PostMapping
    public ResponseEntity<ApiResponse<TransferResponseDTO>> createTransfer(@Valid @RequestBody TransferRequestDTO request) {
        TransferResponseDTO transferResponseDTO = transferService.createTransfer(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Transfer créé avec succes", transferResponseDTO));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransferResponseDTO>>> getAllTransfers(){
        List<TransferResponseDTO> transferResponseDTO = transferService.getAllTransfers();
        return ResponseEntity.ok(new ApiResponse<>("Transfers recupere avec succes", transferResponseDTO));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<TransferResponseDTO>> updateStatus(@PathVariable String id, @RequestParam TransferStatus status){
        TransferResponseDTO updated = transferService.updateTransferStatus(id, status);
        return ResponseEntity.ok(new ApiResponse<>("Statut mis a jour avec succes", updated));
    }
}
