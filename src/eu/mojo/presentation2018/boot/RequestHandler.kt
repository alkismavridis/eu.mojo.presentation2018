package eu.mojo.presentation2018.boot

import com.google.gson.Gson
import eu.mojo.presentation2018.graphql.GraphqlService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

private val MAP = HashMap<String, Object>()

class RequestHandler {
    //region FIELDS
    val app:App
    //endregion



    constructor(app:App) {
        this.app = app
    }



    fun handle(req: HttpServletRequest, res: HttpServletResponse, session:ShopSession) {
        println(session.requestCount++)
        println(session.requestCount)


        when (req.servletPath) {
            "/ql" -> handleQl(req, res, session)
            else -> sendJson404(req,res, session)

        }

        //AppSession session = sessionHolder.get( httpReq.getSession().getId() );

    }

    private fun sendJson404(req: HttpServletRequest, res: HttpServletResponse, session:ShopSession) {
        res.contentType = "application/json"
        res.status = 404
        res.writer.append("{\"message\":\"Not found\", \"resource\":\""+req.servletPath+"\"}")
        res.flushBuffer()
    }




    //region HANDLERS
    private fun handleQl(req: HttpServletRequest, res: HttpServletResponse, session:ShopSession) {
        val bodyMap = Gson().fromJson(getJsonBodyFrom(req), MAP.javaClass)

        res.contentType = "application/json; charset=utf-8"
        res.writer.append(app.graphqlService.execute( bodyMap.get("query") as String,  bodyMap.get("params") as Map<String, Object>?, session))
        res.flushBuffer()
    }
    //endregion





    //region UTILS
    fun getJsonBodyFrom(req:HttpServletRequest):String {
        var ret= ""
        req.reader.lines().forEach {line ->
            ret += line+"\n"
        }

        return ret;
    }
    //endregion
}