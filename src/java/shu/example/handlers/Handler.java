package shu.example.handlers;

import org.apache.commons.lang3.StringEscapeUtils;
import org.intellij.lang.annotations.Language;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.List;

/**
 *
 */
public abstract class Handler {

public static void sendNotFound(@NotNull HttpServletResponse response)
		throws IOException {
	response.setStatus(HttpServletResponse.SC_NOT_FOUND);
	PrintWriter writer = response.getWriter();
	writer.write("{\"error\":\"Not found\"}");
}

public static void sendError(@NotNull HttpServletResponse response,
		int status, @NotNull String message) throws IOException {
	response.setStatus(status);
	PrintWriter writer = response.getWriter();
	writer.write("{\"error\":\"");
	StringEscapeUtils.ESCAPE_JSON.translate(message, writer);
	writer.write("\"}");
}

public abstract void handle(@NotNull HttpServletRequest request,
		@NotNull HttpServletResponse response, @NotNull Connection db,
		@NotNull List<String> ids)
		throws IOException, SQLException;

}
