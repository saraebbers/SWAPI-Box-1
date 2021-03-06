import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'
import fetchData from './Fetch/Fetch'

describe('App', () => {

it('should match the screenshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

it('should have a default state', async () => {
    const wrapper = shallow(<App />)
    const expected = { films: [], homeState: 'active-main home-main', people: [], vehicles: [], planets: [], homeWorld: [], favorites: [], error: '', residents: [], species: [] }
    expect(wrapper.state()).toEqual(expected)
  })

 it('should retreive data from API for scrolling film information', async () => {

  let expected = [{ name: 'Luke Skywalker', homeworld: 'Tatooine' }]

  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true, json: () => Promise.resolve(expected)}))

  const URL = 'https://swapi.co/api/people';
  const result = await fetchData(URL)
  const filmData = result
  expect(filmData).toEqual(expected) 
 })

  it.skip('should retrieve data from local storage on mount', () =>{

    const wrapper = shallow(<App />)
    const mockfilmData = {
            "title": "A New Hope", 
        }
  
    wrapper.instance().updateLocalStorage(mockfilmData);

    expect(localStorage).toEqual({ "title": "A New Hope"});
  });

    it('removeFavorites removes favorite from state', async () => {

    const wrapper = shallow(<App />) 
    const initialState = [{id: 'Luke', name: 'Luke', location: 'Mars'}, {id: 'Lea', name: 'Lea', location: 'Mars'}]
    console.log(initialState[0].name)
    const expected = [{id: 'Luke', name: 'Luke', location: 'Mars'}]

    wrapper.setState({ favorites: initialState })
    await wrapper.instance().removeFavorites('Lea')

    expect(wrapper.state('favorites')).toEqual(expected)
  })

  it('handleFavorites adds a Favorite to state', () => {
    const wrapper = shallow(<App />) 
    const initialState = []
    const mockFavorite = {name: 'Luke', type:'person'}
    const expected = [{id: 'Luke', name: 'Luke', type:'person'}]

    wrapper.setState({ favorites: initialState })
    wrapper.instance().handleFavorites(mockFavorite)

    expect(wrapper.state('favorites')).toEqual(expected)
    expect(wrapper.state('favorites').length).toEqual(1)
  })

    it.skip('should set state once its called', async () => {
    const wrapper = shallow(<App />)
    wrapper.instance().fetchCall = jest.fn()
    let localStorage = new LocalStorage
    window.localStorage = localStorage
      const mockFetchCall = jest.fn(() => {
        return Promise.resolve([{ hero: 'Luke' }, { hero: 'r2d2' }]);
      });
      const mockPeople = { handlePeople: mockFetchCall };
      wrapper.state().handlePeopleLink = mockPeople;

      await wrapper.instance().handlePeopleLink();
      expect(wrapper.state().people).toEqual([{ hero: 'Luke' }, { hero: 'r2d2' }])
    })


  describe('componentDidMount', () => {
    it.skip('should call showFilmCrawl() on componentDidMount', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().fetchCall = jest.fn()
    let localStorage = new LocalStorage
    window.localStorage = localStorage
      wrapper.instance().showFilmCrawl = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().showFilmCrawl).toHaveBeenCalled();
    })

    it.skip('should call checkPathName() on componentDidMount', () => {
      const wrapper = shallow(<App />) 
      wrapper.instance().checkPathName = jest.fn();
      wrapper.instance().checkPathName();
      expect(wrapper.instance().checkPathName).toHaveBeenCalled();
    })
  });
})