package com.wkulesza.exception;

public class PetToDtoConvertionException extends Exception {

    public PetToDtoConvertionException(String message) {
        super(message);
    }

    public PetToDtoConvertionException(String message, Throwable cause) {
        super(message, cause);
    }
}
