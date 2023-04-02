/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package AsyncRemoteStorage.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mahmouderradi
 */
@RestController
@RequestMapping("/remotestorage")
public class RenameController {
	@Value("${file.uploadDir}")
	private String uploadDir;

	@PutMapping("/renameFile")
	public ResponseEntity<String> renameFile(@RequestParam("oldFileName") String oldFileName,
						  @RequestParam("newFileName") String newFileName) {
		Path oldFilePath = Paths.get(uploadDir + oldFileName);
		Path newFilePath = Paths.get(uploadDir + newFileName);

		Path subPath = oldFilePath.getParent();

		newFilePath = subPath.resolve(newFileName);

		try {
			Path move = Files.move(oldFilePath, newFilePath, StandardCopyOption.REPLACE_EXISTING);
			return ResponseEntity.ok().body("File renamed successfully");
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to rename file");
		}
	}
}