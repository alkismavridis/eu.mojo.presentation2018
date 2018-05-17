package eu.mojo.presentation2018.error;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShopException extends Exception implements GraphQLError {

    //region FIELDS
    ErrorCode code;
    //endregion




    //region CONSTRUCTORS
    public ShopException(ErrorCode code, String message) {
        super(message);
        this.code = code;
    }

    public ShopException(ErrorCode code) {
        super(code.name());
        this.code = code;
    }
    //endregion




    //region OVERRIDES
    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorType getErrorType() {
        return null;
    }

    @Override
    public Map<String, Object> getExtensions() {
        Map<String, Object> ret = new HashMap<>(1);
        ret.put("code", code.getValue());
        return ret;
    }
    //endregion
}
