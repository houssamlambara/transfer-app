package com.houssam.backend.exception;

public class TransferNotFoundException extends RuntimeException {

    public TransferNotFoundException(String id) {
        super("Transfer introuvable avec l'id : " + id);
    }
}
