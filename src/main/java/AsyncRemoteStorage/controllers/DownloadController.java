/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package AsyncRemoteStorage.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
public class DownloadController {
	@Value("${file.uploadDir}")
	private String uploadDir;
	
	@GetMapping("/downloadFile")
	public ResponseEntity<Resource> downloadFile(@RequestParam("fileName") String fileName) throws IOException {
		Path filePath = Paths.get(uploadDir).resolve(fileName);
		Resource resource = new UrlResource(filePath.toUri());
		
		if (!resource.exists()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
		
		return ResponseEntity.ok()
			.headers(headers)
			.contentLength(resource.contentLength())
			.contentType(MediaType.parseMediaType("application/octet-stream"))
			.body(resource);
	}
}