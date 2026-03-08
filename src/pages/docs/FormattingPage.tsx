import DocsLayout from "@/components/docs/DocsLayout";
import CodeBlock from "@/components/docs/CodeBlock";
import PlaygroundLink from "@/components/docs/PlaygroundLink";

const FormattingPage = () => (
  <DocsLayout>
    <h1 className="text-3xl font-bold mb-2">Formatting &amp; Casing</h1>
    <p className="text-muted-foreground mb-4">
      Enforce consistent casing across operationIds, properties, parameters, and component keys.
    </p>
    <PlaygroundLink label="Try formatting in the Playground" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">CLI Usage</h2>
    <CodeBlock code={`npx openapi-format openapi.json -o output.json --casingFile customCasing.yaml`} title="Terminal" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Casing Types</h2>
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Type</th>
            <th className="text-left py-2 pr-4 font-semibold">Alias</th>
            <th className="text-left py-2 font-semibold">Example</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {[
            ["🐪 camelCase", "camelCase", "openapiFormat"],
            ["👨‍🏫 PascalCase", "PascalCase", "OpenapiFormat"],
            ["🥙 kebab-case", "kebabCase", "openapi-format"],
            ["🚂 Train-Case", "TrainCase", "Openapi-Format"],
            ["🐍 snake_case", "snakeCase", "openapi_format"],
            ["🕊 Ada_Case", "AdaCase", "Openapi_Format"],
            ["📣 CONSTANT_CASE", "constantCase", "OPENAPI_FORMAT"],
            ["👔 COBOL-CASE", "cobolCase", "OPENAPI-FORMAT"],
            ["📍 Dot.notation", "dotNotation", "openapi.format"],
            ["🛰 Space case", "spaceCase", "openapi format"],
            ["🏛 Capital Case", "capitalCase", "Openapi Format"],
            ["🔡 lower case", "lowerCase", "openapi format"],
            ["🔠 UPPER CASE", "upperCase", "OPENAPI FORMAT"],
          ].map(([type, alias, example]) => (
            <tr key={alias} className="border-b">
              <td className="py-2 pr-4">{type}</td>
              <td className="py-2 pr-4 font-mono text-xs text-foreground">{alias}</td>
              <td className="py-2 font-mono text-xs">{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Configurable Elements</h2>
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Key</th>
            <th className="text-left py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {[
            ["operationId", "Operation IDs in the Operations Object"],
            ["properties", "Schema property keys (inline & components)"],
            ["parametersQuery", "Query parameter names"],
            ["parametersHeader", "Header parameter names"],
            ["parametersPath", "Path parameter names"],
            ["parametersCookie", "Cookie parameter names"],
            ["componentsSchemas", "Schema model keys & $ref links"],
            ["componentsExamples", "Example model keys & $ref links"],
            ["componentsHeaders", "Header model keys & $ref links"],
            ["componentsResponses", "Response model keys & $ref links"],
            ["componentsRequestBodies", "Request body model keys & $ref links"],
            ["componentsSecuritySchemes", "Security scheme keys & $ref links"],
            ["componentsParametersQuery", "Query parameter component keys"],
            ["componentsParametersHeader", "Header parameter component keys"],
            ["componentsParametersPath", "Path parameter component keys"],
            ["componentsParametersCookie", "Cookie parameter component keys"],
          ].map(([key, desc]) => (
            <tr key={key} className="border-b">
              <td className="py-2 pr-4 font-mono text-xs text-foreground whitespace-nowrap">{key}</td>
              <td className="py-2">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Full Configuration Example</h2>
    <CodeBlock code={`operationId: snake_case
properties: camelCase

parametersQuery: kebab-case
parametersHeader: kebab-case
parametersPath: snake_case

componentsExamples: PascalCase
componentsSchemas: camelCase
componentsHeaders: kebab-case
componentsResponses: snake_case
componentsRequestBodies: snake_case
componentsSecuritySchemes: PascalCase

componentsParametersQuery: snake_case
componentsParametersHeader: kebab-case
componentsParametersPath: camelCase`} title="customCasing.yaml" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Example: operationId</h2>
    <CodeBlock code={`operationId: kebab-case`} title="casing.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`paths:
  /pets:
    get:
      operationId: getPets
  /pets/{petId}:
    get:
      operationId: getPetById
    delete:
      operationId: deletePet`} title="Before" playground />
      <CodeBlock code={`paths:
  /pets:
    get:
      operationId: get-pets
  /pets/{petId}:
    get:
      operationId: get-pet-by-id
    delete:
      operationId: delete-pet`} title="After" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Example: Schema Properties</h2>
    <CodeBlock code={`properties: snake_case`} title="casing.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`components:
  schemas:
    UserModel:
      type: object
      properties:
        id:
          type: integer
          example: 10
        emailAddress:
          type: string
          example: john@doe.com
        firstName:
          type: string
          example: John
        lastName:
          type: string
          example: Doe`} title="Before" playground />
      <CodeBlock code={`components:
  schemas:
    UserModel:
      type: object
      properties:
        id:
          type: integer
          example: 10
        email_address:
          type: string
          example: john@doe.com
        first_name:
          type: string
          example: John
        last_name:
          type: string
          example: Doe`} title="After" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Example: Component Keys</h2>
    <CodeBlock code={`componentsSchemas: PascalCase`} title="casing.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`paths:
  /orders:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/order-model'
components:
  schemas:
    userModel:
      type: object
    order-model:
      type: object
    pet_model:
      type: object`} title="Before" playground />
      <CodeBlock code={`paths:
  /orders:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderModel'
components:
  schemas:
    UserModel:
      type: object
    OrderModel:
      type: object
    PetModel:
      type: object`} title="After — keys + $ref links updated" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Example: Parameter Names</h2>
    <CodeBlock code={`parametersPath: kebab-case
parametersQuery: snake_case`} title="casing.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`paths:
  '/pet/{petId}':
    get:
      parameters:
        - name: petId
          in: path
          description: ID of pet to return
        - name: includeDetails
          in: query
          description: Include full details
        - $ref: '#/components/parameters/LimitParam'
components:
  parameters:
    LimitParam:
      name: limitParam
      in: query`} title="Before" playground />
      <CodeBlock code={`paths:
  '/pet/{petId}':
    get:
      parameters:
        - name: pet-id
          in: path
          description: ID of pet to return
        - name: include_details
          in: query
          description: Include full details
        - $ref: '#/components/parameters/LimitParam'
components:
  parameters:
    LimitParam:
      name: limit_param
      in: query`} title="After" />
    </div>
  </DocsLayout>
);

export default FormattingPage;
