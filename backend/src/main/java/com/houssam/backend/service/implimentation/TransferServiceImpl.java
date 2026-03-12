package com.houssam.backend.service.implimentation;

import com.houssam.backend.dto.requestDTO.TransferRequestDTO;
import com.houssam.backend.dto.responseDTO.TransferResponseDTO;
import com.houssam.backend.entity.Transfer;
import com.houssam.backend.enums.TransferStatus;
import com.houssam.backend.exception.TransferNotFoundException;
import com.houssam.backend.mapper.TransferMapper;
import com.houssam.backend.repository.TransferRepository;
import com.houssam.backend.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService {

    private final TransferRepository transferRepository;
    private final TransferMapper transferMapper;

    @Override
    @Transactional
    public TransferResponseDTO createTransfer(TransferRequestDTO request) {
        Transfer saved = transferRepository.save(transferMapper.toEntity(request));
        return transferMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransferResponseDTO> getAllTransfers() {
        return transferRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(transferMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional
    public TransferResponseDTO updateTransferStatus(String id, TransferStatus status) {
        Transfer transfer = transferRepository.findById(id)
                .orElseThrow(() -> new TransferNotFoundException(id));

        transfer.setStatus(status);
        return transferMapper.toResponseDTO(transferRepository.save(transfer));
    }
}
