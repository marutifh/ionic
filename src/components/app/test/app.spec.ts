import {App, Nav, Tabs, Tab, NavOptions, Config, ViewController, Platform} from '../../../../src';

export function run() {


describe('IonicApp', () => {

  describe('getActiveNav', () => {

    it('should get active NavController when using tabs with nested nav', () => {
      let nav = mockNav();
      app.setRootNav(nav);

      let tabs = mockTabs();
      let tab1 = mockTab(tabs);
      let tab2 = mockTab(tabs);
      nav.registerChildNav(tabs);

      tab2.setSelected(true);
      let nav2 = mockNav();
      let nav3 = mockNav();
      let nav4 = mockNav();
      tab1.registerChildNav(nav4);
      tab2.registerChildNav(nav2);
      tab2.registerChildNav(nav3);

      expect(app.getActiveNav()).toBe(nav3);
    });

    it('should get active NavController when using tabs', () => {
      let nav = mockNav();
      app.setRootNav(nav);

      let tabs = mockTabs();
      let tab1 = mockTab(tabs);
      let tab2 = mockTab(tabs);
      let tab3 = mockTab(tabs);
      nav.registerChildNav(tabs);

      tab2.setSelected(true);

      expect(app.getActiveNav()).toBe(tab2);

      tab2.setSelected(false);
      tab3.setSelected(true);
      expect(app.getActiveNav()).toBe(tab3);
    });

    it('should get active NavController when nested 3 deep', () => {
      let nav1 = mockNav();
      let nav2 = mockNav();
      let nav3 = mockNav();
      app.setRootNav(nav1);

      nav1.registerChildNav(nav2);
      nav2.registerChildNav(nav3);

      expect(app.getActiveNav()).toBe(nav3);
    });

    it('should get active NavController when nested 2 deep', () => {
      let nav1 = mockNav();
      let nav2 = mockNav();
      app.setRootNav(nav1);

      nav1.registerChildNav(nav2);
      expect(app.getActiveNav()).toBe(nav2);
    });

    it('should get active NavController when only one nav controller', () => {
      let nav = mockNav();
      app.setRootNav(nav);
      expect(app.getActiveNav()).toBe(nav);
    });

    it('should set/get the root nav controller', () => {
      let nav = mockNav();
      app.setRootNav(nav);
      expect(app.getRootNav()).toBe(nav);
    });

    it('should not get an active NavController if there is not root set', () => {
      expect(app.getActiveNav()).toBeNull();
      expect(app.getRootNav()).toBeNull();
    });

  });

  describe('registerTransition', () => {
    it('should disable app when registering a transition', () => {
      // arrange
      app._numTransitions = 0;
      spyOn(app, "setEnabled");
      let DURATION = 300;
      // act
      app.registerTransition(DURATION);
      // assert
      expect(app._numTransitions).toEqual(1);
      expect(app.setEnabled).toHaveBeenCalledWith(false, DURATION);
    });

    it('should correctly track number of transitions', () => {
      // arrange
      app._numTransitions = 0;
      spyOn(app, "setEnabled");

      // act and assertions together

      // register a transition, check data
      app.registerTransition(300);
      expect(app._numTransitions).toEqual(1);
      expect(app.setEnabled).toHaveBeenCalledWith(false, 300);
      // reset the spy
      app.setEnabled.calls.reset();

      // register a transition, check data
      app.registerTransition(30);
      expect(app._numTransitions).toEqual(2);
      expect(app.setEnabled).not.toHaveBeenCalled();
      // reset the spy
      app.setEnabled.calls.reset();

      // register a transition, check data
      app.registerTransition(30);
      expect(app._numTransitions).toEqual(3);
      expect(app.setEnabled).not.toHaveBeenCalled();
      // reset the spy
      app.setEnabled.calls.reset();

      // register a transition, check data
      app.registerTransition(300);
      expect(app._numTransitions).toEqual(4);
      expect(app.setEnabled).toHaveBeenCalledWith(false, 300);
    });
  });

  describe('transitionComplete', () => {
    it('should decrement the number of transitions', () => {
      // arrange
      app._numTransitions = 1;
      spyOn(app, "setEnabled");
      // act
      app.transitionComplete();
      // assert
      expect(app._numTransitions).toEqual(0);
      expect(app.setEnabled).toHaveBeenCalledWith(true);
    });

    it('should reset numTransitions to 0 if below zero', () => {
      // arrange
      app._numTransitions = 0;
      spyOn(app, "setEnabled");
      // act
      app.transitionComplete();
      // assert
      expect(app._numTransitions).toEqual(0);
      expect(app.setEnabled).toHaveBeenCalledWith(true);
    });

    it('should not call setEnabled if numTransition > 0', () => {
      // arrange
      app._numTransitions = 2;
      spyOn(app, "setEnabled");
      // act
      app.transitionComplete();
      // assert
      expect(app._numTransitions).toEqual(1);
      expect(app.setEnabled).not.toHaveBeenCalled();
    });

  });

  var app: App;
  var config: Config;
  var platform: Platform;
  var _cd: any;

  function mockNav(): Nav {
    return new Nav(null, null, null, config, null, null, null, null, null);
  }

  function mockTabs(): Tabs {
    return new Tabs(null, null, null, config, null, null, null);
  }

  function mockTab(parentTabs: Tabs): Tab {
    return new Tab(parentTabs, app, config, null, null, null, null, null, _cd);
  }

  beforeEach(() => {
    config = new Config();
    platform = new Platform();
    app = new App(config, null, platform);
    _cd = {
      reattach: function(){},
      detach: function(){}
    };
  });

});


}
