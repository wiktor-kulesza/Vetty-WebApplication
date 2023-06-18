package com.wkulesza.controller;

import com.wkulesza.dto.ImageDto;
import com.wkulesza.entity.Image;
import com.wkulesza.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    private final ModelMapper modelMapper;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Integer> addImage(@RequestParam("image") MultipartFile file) throws IOException {
        return ResponseEntity.ok(imageService.addImage(file));
    }

    @CrossOrigin
    @GetMapping(path = "/all")
    public ResponseEntity<List<ImageDto>> getImageById() {
        List<Image> images = imageService.getAllImages();
        return ResponseEntity.ok(convertToDto(images));
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public ResponseEntity<ImageDto> getImageById(@PathVariable Integer id) {
        Image image = imageService.getImageById(id);
        return ResponseEntity.ok(convertImageToDto(image));
    }

    private ImageDto convertImageToDto(Image image) {
        ImageDto imageDto = modelMapper.map(image, ImageDto.class);
        imageDto.setImageBase64(Base64.getEncoder().encodeToString(imageDto.getImage()));
        imageDto.setImage(null);
        return imageDto;
    }

    private List<ImageDto> convertToDto(List<Image> images) {
        List<ImageDto> imageDtos = new ArrayList<>();
        images.forEach(image -> imageDtos.add(convertImageToDto(image)));
        return imageDtos;
    }

}
