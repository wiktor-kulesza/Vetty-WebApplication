package com.example.exception;

public class MedicalHistoryToDtoConvertionException extends Exception {
    public MedicalHistoryToDtoConvertionException(String message) {
        super(message);
    }

    public MedicalHistoryToDtoConvertionException(String message, Throwable cause) {
        super(message, cause);
    }
}
