import Message from "../../models/Message";
import mongoose from "mongoose";

const MessageM = mongoose.model("Message", Message);

describe('Message', () => {
  let message;

  beforeEach(() => {
    message = new MessageM({message:'Hello, World!'});
  });

  afterEach(() => {
    message = null;
  });

  it('should have a text property', () => {
    expect(message).toHaveProperty('message');
  });

  it('text should be a string', () => {
    expect(typeof message.message).toBe('string');
  });

  it('should have a createdAt property', () => {
    expect(message).toHaveProperty('timestamp');
  });

  it('createdAt should be a Date object', () => {
    expect(message.timestamp instanceof Date).toBe(true);
  });
});