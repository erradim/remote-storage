/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package AsyncRemoteStorage.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mahmouderradi
 */
@RestController
@RequestMapping("/remotestorage")
public class DeleteController {
	@Value("${file.uploadDir}")
	private String uploadDir;
	
	@DeleteMapping("/deleteFile")
	public ResponseEntity<Void> deleteFile(@RequestParam("fileName") String fileName) {
		Path filePath = Paths.get(uploadDir).resolve(fileName);
		try {
			Files.delete(filePath);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}