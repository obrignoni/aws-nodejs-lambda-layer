# Serverless AWS Node.js Lambda Layer

- Lambda Layer
  - Bundle layer zip with webpack  
  - Include dependencies with webpack copy plugin
  - Deploy with Serverless
  - ES modules need to be imported via root entry. Example:
    ```
    # Works
    import { v4 as uuid } from 'uuid'

    # Fails
    import uuid from 'uuid/v4'
    ```
- Lambda Function
  - Exclude dependencies from lambda function with webpack-node-externals
  - Generate aliases for the code to work equally on local and lambda
  - Reference layer arn from cloudformation output
  - Deploy separately with Serverless