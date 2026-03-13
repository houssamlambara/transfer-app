package com.houssam.backend.service.implementation;

import com.houssam.backend.dto.requestDTO.TransferRequestDTO;
import com.houssam.backend.dto.responseDTO.TransferResponseDTO;
import com.houssam.backend.entity.Transfer;
import com.houssam.backend.entity.User;
import com.houssam.backend.enums.TransferStatus;
import com.houssam.backend.exception.TransferNotFoundException;
import com.houssam.backend.mapper.TransferMapper;
import com.houssam.backend.repository.TransferRepository;
import com.houssam.backend.repository.UserRepository;
import com.houssam.backend.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService {

    private final TransferRepository transferRepository;
    private final UserRepository userRepository;
    private final TransferMapper transferMapper;

    @Override
    @Transactional
    public TransferResponseDTO createTransfer(TransferRequestDTO request) {
        User sender = userRepository.findByEmail(request.getSenderEmail())
                .orElseThrow(() -> new IllegalArgumentException("Expéditeur introuvable"));

        User receiver = userRepository.findByEmail(request.getReceiverEmail())
                .orElseThrow(() -> new IllegalArgumentException("Bénéficiaire introuvable"));

        if (sender.getId().equals(receiver.getId())) {
            throw new IllegalArgumentException("L'expéditeur et le bénéficiaire doivent être différents");
        }

        if (sender.getBalance() < (request.getAmount())) {
            throw new IllegalArgumentException("Solde insuffisant pour ce virement");
        }

        sender.setBalance(sender.getBalance() - request.getAmount());
        receiver.setBalance(receiver.getBalance() + request.getAmount());

        userRepository.save(sender);
        userRepository.save(receiver);

        Transfer transfer = Transfer.builder()
                .sender(sender)
                .receiver(receiver)
                .amount(request.getAmount())
                .build();

        Transfer saved = transferRepository.save(transfer);
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
