package com.houssam.backend.service;

import com.houssam.backend.dto.requestDTO.TransferRequestDTO;
import com.houssam.backend.dto.responseDTO.TransferResponseDTO;
import com.houssam.backend.enums.TransferStatus;

import java.util.List;

public interface TransferService {

    TransferResponseDTO createTransfer(TransferRequestDTO requestDTO);

    List<TransferResponseDTO> getAllTransfers();

    TransferResponseDTO updateTransferStatus(String id, TransferStatus status);
}
