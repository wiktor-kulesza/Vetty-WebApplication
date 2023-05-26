package com.wkulesza.exception;

public class MedicalHistoryToDtoConvertionException extends Exception {
    public MedicalHistoryToDtoConvertionException(String message) {
        super(message);
    }

    public MedicalHistoryToDtoConvertionException(String message, Throwable cause) {
        super(message, cause);
    }
}
