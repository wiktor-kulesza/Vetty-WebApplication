package com.example.service;

import com.example.entity.Thread;
import com.example.repository.ThreadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ThreadService {

    private final ThreadRepository threadRepository;

    public List<Thread> getAllThreads() {
        return threadRepository.findAll();
    }

    public Thread addThread(Thread thread) {
        return threadRepository.save(thread);
    }

    public Thread getThreadById(Integer id) {
        return threadRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }
}
