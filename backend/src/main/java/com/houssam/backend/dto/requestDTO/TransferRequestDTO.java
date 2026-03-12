package com.houssam.backend.dto.requestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransferRequestDTO {

    @NotBlank(message = "Sender email is required")
    private String senderEmail;

    @NotBlank(message = "Receiver email is required")
    private String receiverEmail;

    @NotNull(message = "Le montant est requis")
    @Positive(message = "Le montant doit être supérieur à 0")
    private double amount;
}
