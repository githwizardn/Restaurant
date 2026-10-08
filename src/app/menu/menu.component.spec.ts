import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { MENU_ITEMS } from '../data/menu.data';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all menu items initially', () => {
    expect(component.filteredItems.length).toBe(MENU_ITEMS.length);
  });

  it('should filter items by "ბურგერები" tab', () => {
    component.setActiveTab('ბურგერები');
    const allAreBurgers = component.filteredItems.every(item =>
      item.tabs.includes('ბურგერები')
    );
    expect(allAreBurgers).toBeTrue();
    expect(component.filteredItems.length).toBeGreaterThan(0);
  });

  it('should filter items by "სასმელები" tab', () => {
    component.setActiveTab('სასმელები');
    const allAreDrinks = component.filteredItems.every(item =>
      item.tabs.includes('სასმელები')
    );
    expect(allAreDrinks).toBeTrue();
  });

  it('should return to all items when "ყველა" is selected', () => {
    component.setActiveTab('ბურგერები');
    component.setActiveTab('ყველა');
    expect(component.filteredItems.length).toBe(MENU_ITEMS.length);
  });
});