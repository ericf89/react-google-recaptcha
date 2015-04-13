import React from "react";
import ReactTestUtils from "react/lib/ReactTestUtils";
import ReCAPTCHA from "../src/recaptcha";

describe("ReCAPTCHA", function () {
  let callbackName = "onloadcallback";

  afterEach(function () {
    delete window.grecaptcha;
    delete window.callbackName;
  });

  it("Rendered Component should be a div", function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" onloadCallbackName={callbackName} />
    );
    assert.equal(instance.getDOMNode().nodeName, "DIV");
  });
  it("Rendered Component should contained passed props", function () {
    let props = {
      className: "TheClassName",
      id: "superdefinedId",
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" {...props} />
    );
    assert.equal(instance.getDOMNode().id, props.id);
    assert.match(instance.getDOMNode().className, new RegExp(props.className));
  });

  it("should call grecaptcha.render, when it is already loaded", function (done) {
    let grecaptchaMock = {
      render(node, options) {
        assert.isNotNull(node);
        assert.equal(options.sitekey, "xxx");
        done();
      },
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} />
    );
    assert.ok(instance);
  });
  it("reset, should call grecaptcha.reset with the widget id", function (done) {
    let grecaptchaMock = {
      render() {
        return "someWidgetId";
      },

      reset(widgetId) {
        assert.isNotNull(widgetId);
        done();
      },
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} />
    );
    instance.reset();
  });
  describe("Expired", function () {
    it("should call onChange with null when response is expired");
    it("should call onExpired when response is expired");
  });
});
