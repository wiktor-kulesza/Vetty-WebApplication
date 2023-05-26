package com.wkulesza.exception;

public class ThreadCreationException extends Exception {

    public ThreadCreationException(String message) {
        super(message);
    }

    public ThreadCreationException(String message, Throwable cause) {
        super(message, cause);
    }
}

