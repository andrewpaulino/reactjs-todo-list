const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');
const Actions = require('nightmare-react-utils').Actions

Nightmare.action(...Actions)

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8080);

const url = 'http://localhost:8080';

describe('express', () => {
  beforeEach(() => {
    nightmare = new Nightmare({
      openDevTools: {
        mode: 'detach'
      },
      show: true
    });
  });

  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));

  it('should include textarea element with class todoText for the user to enter todo text', () =>
    nightmare
    .goto(url)
    .react.findAll('textarea[name=todoText]')
    .then((element) => {
      expect(element.length).to.not.equal(0);
      expect(element[0]).to.not.be.null;
      expect(typeof element).to.equal('object');
    })
  ).timeout(12000);

  it('should add todo item with priority', () =>
    nightmare
    .goto(url)
    .select('select[name=todoPriority]', '1')
    .type('textarea[name=todoText]', 'ITEM')
    .click('button.btn')
    .wait(1000)
    .react.findAll('li')
    .then((component) => {
      expect(component[0].props.todo.text).to.be.equal('ITEM');
      expect(component[0].props.todo.priority).to.be.equal('1');
    })
  ).timeout(12000)

  it('should show todo item with add and delete', () =>
    nightmare
    .goto(url)
    .select('select[name=todoPriority]', '1')
    .type('textarea[name=todoText]', 'ITEM')
    .click('button.btn')
    .wait(1000)
    .evaluate(() => document.querySelectorAll('a').length)
    .end()
    .then((length) => {
      expect(length).to.be.equal(2)
    })
  ).timeout(12000)

  it('should allow to edit a todo item by clicking #edit-link', () =>
    nightmare
    .goto(url)
    .select('select[name=todoPriority]', '1')
    .type('textarea[name=todoText]', 'ITEM')
    .click('button.btn')
    .wait(1000)
    .click('#edit-link')
    .wait(1000)
    .evaluate(() => document.querySelector('#edit-description').innerHTML)
    .end()
    .then((text) => {
      expect(text).to.be.equal('ITEM');
    })
  ).timeout(12000)

  it('should allow to delete a todo item by clicking #delete-link', () =>
    nightmare
    .goto(url)
    .select('select[name=todoPriority]', '1')
    .type('textarea[name=todoText]', 'ITEM')
    .click('button.btn')
    .select('select[name=todoPriority]', '1')
    .type('textarea[name=todoText]', 'ITEM2')
    .click('button.btn')
    .wait(1000)
    .click('#delete-link')
    .wait(1000)
    .evaluate(() => document.querySelectorAll('li').length)
    .end()
    .then((length) => {
      expect(length).to.be.equal(2);
    })
  ).timeout(12000)

});
