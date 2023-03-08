package com.example.service;

import com.example.entity.Image;
import com.example.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public Image getImageById(Integer id) {
        return imageRepository.findById(id).get();
    }

    public Integer addImage(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setImage(file.getBytes());
        imageRepository.save(image);
        return image.getId();
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }
}
