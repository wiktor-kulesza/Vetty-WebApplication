package com.example.exception;

public class MultipartFileConversionException extends Exception {

    public MultipartFileConversionException(String message) {
        super(message);
    }

    public MultipartFileConversionException(String message, Throwable cause) {
        super(message, cause);
    }
}
