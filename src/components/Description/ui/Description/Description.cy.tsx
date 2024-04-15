import { mount } from "cypress/react18";
import { Description } from "./Description";

describe("Description Component", () => {
  it("renders the component with an optional label", () => {
    mount(<Description label="Description" />);
    cy.contains("Description").should("be.visible");
  });

  it("shows error message when the character limit is exceeded", () => {
    mount(<Description maxLimit={10} />);
    cy.get('[role="textbox"]').type("This text is too long");
    cy.contains(/Max symbols limit is 10/).should("be.visible");
  });

  it("updates text length counter as text is entered", () => {
    mount(<Description />);
    cy.get('[role="textbox"]').type("Hello");
    cy.get('[data-test-id="text-length-counter"]').should("contain", "5");
  });

  it("shows error message when forbidden words are used", () => {
    mount(
      <Description
        isError={true}
        forbiddenWords={["forbidden"]}
        helpText="Restricted words detected, please rephrase"
      />
    );
    cy.get('[role="textbox"]').type("This text contains forbidden words");
    cy.contains(/Restricted words detected, please rephrase/).should(
      "be.visible"
    );
  });
  it("should highligh forbidden word", () => {
    mount(<Description forbiddenWords={["forbidden"]} isError={true} />);
    cy.get('[role="textbox"]').type("This text contains forbidden words");
    cy.get(".forbidden-word").should("exist");
  });

  it("should highligh forbidden word", () => {
    mount(<Description defaultValue="test default value" />);
    cy.contains(/test default value/).should("be.visible");
  });
});
