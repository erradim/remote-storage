/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package AsyncRemoteStorage.controllers;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mahmouderradi
 */
@RestController
@RequestMapping("/remotestorage")
public class BrowseController {
	@Value("${file.uploadDir}")
	private String uploadDir;

	@GetMapping("/browseFolder")
	public ResponseEntity<String> browseFolder(@RequestParam("folderPath") String folderPath) {
		Path dirPath = Paths.get(uploadDir, folderPath);
		StringBuilder fileList = new StringBuilder();
		try (DirectoryStream<Path> stream = Files.newDirectoryStream(dirPath)) {
			for (Path path : stream) {
				fileList.append(path.getFileName().toString()).append("\n");
			}
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("A problem has occured!");
		}
		return ResponseEntity.ok().body(fileList.toString());
	}
}