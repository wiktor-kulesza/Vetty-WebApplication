package com.wkulesza.util;

import com.wkulesza.exception.MultipartFileConversionException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUtil {

    public static File convertToFile(MultipartFile multipartFile) {
        String fileName = ((multipartFile.getOriginalFilename() == null) ? "temp" : multipartFile.getOriginalFilename());
        File convFile = new File(fileName);
        try {
            boolean ifCreated = convFile.createNewFile();
            if (!ifCreated)
                throw new MultipartFileConversionException("Error while converting multipart file to file");
            FileOutputStream fos = new FileOutputStream(convFile);
            fos.write(multipartFile.getBytes());
            fos.close(); //IOUtils.closeQuietly(fos);
        } catch (IOException | MultipartFileConversionException e) {
            convFile = null;
        }

        return convFile;
    }

    public static boolean deleteFile(File file) {
        return file.delete();
    }
}
