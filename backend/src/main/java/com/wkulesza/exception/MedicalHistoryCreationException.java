package com.wkulesza.exception;

public class MedicalHistoryCreationException extends Exception {

    public MedicalHistoryCreationException(String message) {
        super(message);
    }

    public MedicalHistoryCreationException(String message, Throwable cause) {
        super(message, cause);
    }
}
