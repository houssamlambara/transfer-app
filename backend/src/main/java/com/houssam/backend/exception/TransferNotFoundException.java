package com.houssam.backend.exception;

public class TransferNotFoundException extends RuntimeException {

    public TransferNotFoundException(Long id) {
        super("Transfer introuvable avec l'id : " + id);
    }
}

