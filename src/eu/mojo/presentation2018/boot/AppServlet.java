package eu.mojo.presentation2018.boot;

import javax.servlet.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileSystems;


@MultipartConfig(fileSizeThreshold=1024*1024*2, // 2MB
        maxFileSize=1024*1024*10,      // 10MB
        maxRequestSize=1024*1024*50)   // 50MB
public class AppServlet implements Servlet {

    //region FIELDS
    ServletConfig servletConfig;
    RequestHandler handler;
    App app;
    //endregion



    //region OVERRIDES
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        try {
            String resourcesPath = servletConfig.getServletContext().getResource("/").getPath();
            app = new App(FileSystems.getDefault().getPath(resourcesPath).resolve("WEB-INF/resources"));
            handler = new RequestHandler(app);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public ServletConfig getServletConfig() {
        return this.servletConfig;
    }

    /** Request entry point. This will add an Access-Control-Allow-Origin=* header. */
    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        HttpServletRequest httpReq = (HttpServletRequest)req;
        HttpServletResponse httpRes = (HttpServletResponse)res;

        //add CORS headers
        httpRes.setHeader("Access-Control-Allow-Origin", httpReq.getHeader("Origin"));
        httpRes.setHeader("Access-Control-Allow-Credentials", "true"    );

        handler.handle(httpReq, httpRes, (ShopSession) httpReq.getSession().getAttribute("appSes"));
    }

    @Override
    public String getServletInfo() {
        return "Dummy Online shop for presentation";
    }

    @Override
    public void destroy() {
        System.out.println("I destroy the servlet!");
    }
    //endregion
}
