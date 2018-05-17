package eu.mojo.presentation2018.boot;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class ShopServer {
    //region FIELDS
    //endregion


    //region CONSTRUCTORS
    //endregion


    //region UTIL FUNCTIONS
    //endregion


    //region GETTERS AND SETTERS
    //endregion





    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/test", t -> handle(t));
        server.setExecutor(null); // creates a default executor
        server.start();
    }

    public static void handle(HttpExchange t) throws IOException {
        String response = "This is the response";
        t.sendResponseHeaders(200, response.length());
        OutputStream os = t.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}
