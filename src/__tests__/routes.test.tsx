import React from 'react';
import { routes } from '../routes';

describe('Routes Configuration', () => {
  it('should have all required routes', () => {
    expect(routes).toHaveLength(5);
  });

  it('should have a home route', () => {
    const homeRoute = routes.find(route => route.name === 'Home');
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.routeProps.path).toBe('/');
  });

  it('should have a details route', () => {
    const detailsRoute = routes.find(route => route.name === 'Details');
    expect(detailsRoute).toBeDefined();
    expect(detailsRoute?.routeProps.path).toBe('/:mediaType/:id');
  });

  it('should have a search route', () => {
    const searchRoute = routes.find(route => route.name === 'SearchResult');
    expect(searchRoute).toBeDefined();
    expect(searchRoute?.routeProps.path).toBe('/search/:query');
  });

  it('should have an explore route', () => {
    const exploreRoute = routes.find(route => route.name === 'Explore');
    expect(exploreRoute).toBeDefined();
    expect(exploreRoute?.routeProps.path).toBe('/explore/:mediaType');
  });

  it('should have a 404 route', () => {
    const notFoundRoute = routes.find(route => route.name === 'PageNotFound');
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute?.routeProps.path).toBe('*');
  });
}); 