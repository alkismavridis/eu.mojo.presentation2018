package eu.mojo.presentation2018.graphql

import com.coxautodev.graphql.tools.SchemaParser
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.boot.ShopSession
import eu.mojo.presentation2018.graphql.resolvers.ProductResolver
import eu.mojo.presentation2018.graphql.resolvers.ShopCategoryResolver
import eu.mojo.presentation2018.graphql.resolvers.UserResolver
import eu.mojo.presentation2018.graphql.types.Mutation
import eu.mojo.presentation2018.graphql.types.Query
import graphql.ExecutionInput
import graphql.schema.GraphQLSchema
import graphql.GraphQL
import graphql.Scalars
import graphql.execution.AsyncExecutionStrategy
import graphql.execution.AsyncSerialExecutionStrategy
import graphql.execution.DataFetcherExceptionHandler
import graphql.execution.ExecutionStrategy
import graphql.schema.GraphQLScalarType
import java.nio.file.Files
import graphql.ExceptionWhileDataFetching
import graphql.execution.DataFetcherExceptionHandlerParameters




class GraphqlService {
    //region FIELDS
    val app: App
    val mainSchema: GraphQLSchema
    val exceptionHandler:ShopExceptionHandler
    val mutationStrategy:ExecutionStrategy
    val queryStrategy:ExecutionStrategy
    //endregion




    //region LIFE CYCLE
    constructor(app: App) {
        this.app = app


        //1. SETUP SCALARS
        val scalars:Array<GraphQLScalarType> = arrayOf(
                Scalars.GraphQLLong
        )


        //2. SETUP HANDLERS
        exceptionHandler = ShopExceptionHandler()
        mutationStrategy = AsyncSerialExecutionStrategy(exceptionHandler)
        queryStrategy = AsyncExecutionStrategy(exceptionHandler)


        //3. SETUP RESOLVERS
        val resolvers = listOf(
                Query(app),
                Mutation(app),
                UserResolver(app),
                ProductResolver(app),
                ShopCategoryResolver(app),
                ShopCommentResolver(app)
        )

        val schemaPath = app.resources.resolve("schemas/main.graphqls")
        val schemaString = String(Files.readAllBytes(schemaPath))
        mainSchema = SchemaParser.newParser()
                .schemaString(schemaString)
                .scalars(*scalars)
                .resolvers(resolvers)
                .build()
                .makeExecutableSchema()
    }
    //endregion




    //region EXECUTING QUERIES
    fun execute(query:String, params:Map<String, Object>?, session:ShopSession):String {
        val res = GraphQL
                .newGraphQL(mainSchema)
                .mutationExecutionStrategy(mutationStrategy)
                .queryExecutionStrategy(queryStrategy)
                .build()
                .execute(ExecutionInput.Builder().query(query).variables(params).context(session).build())
                .toSpecification()

        return GsonBuilder().serializeNulls().create().toJson(res)
    }
    //endregion
}



class ShopExceptionHandler : DataFetcherExceptionHandler {
    override fun accept(handlerParameters: DataFetcherExceptionHandlerParameters) {
        val exception = handlerParameters.exception
        val sourceLocation = handlerParameters.field.sourceLocation
        val path = handlerParameters.path
        val error = ExceptionWhileDataFetching(path, exception, sourceLocation)

        handlerParameters.executionContext.addError(error, path)
    }
}
