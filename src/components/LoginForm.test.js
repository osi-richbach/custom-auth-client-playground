import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import ErrorMessage from './ErrorMessage';

describe('LoginForm.js Tests', () => {  
    it('should require correct params', () => {
        let mock = jest.fn();
        console.error = mock;

        const wrapper = shallow(<LoginForm/>);
        
        expect(mock).toHaveBeenCalledTimes(5);
        let concat = [].concat(...mock.mock.calls);

        expect(concat.some((element) => { return element.includes("`onSubmit` is marked as required") })).toBe(true);
        expect(concat.some((element) => { return element.includes("`email` is marked as required") })).toBe(true);
        expect(concat.some((element) => { return element.includes("`password` is marked as required") })).toBe(true);
        expect(concat.some((element) => { return element.includes("`onEmailChange` is marked as required") })).toBe(true);
        expect(concat.some((element) => { return element.includes("`onPasswordChange` is marked as required") })).toBe(true);
    });

    it('should display `Log In` at top', () => {
        const wrapper = shallow(<LoginForm/>);

        let h1 = wrapper.find('h1');

        expect(h1).toHaveLength(1);
        expect(h1.text()).toEqual('Log In');
    });

    it('should pass errorMsg to <ErrorMessage>', () => {
        let mock = jest.fn();
        const wrapper = shallow(<LoginForm 
                                    email="a" 
                                    passowrd="thepassword" 
                                    onSubmit={mock} 
                                    onEmailChange={mock}
                                    onPasswordChange={mock}
                                    errorMsg="some_message"/>);

        let errorMessageTag = wrapper.find(ErrorMessage);
        expect(errorMessageTag).toHaveLength(1);
        expect(errorMessageTag.props().msg).toEqual('some_message');
    });

    describe('email input Tests', () => {  
        it('contains label', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a" 
                                        password="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let label = wrapper.find('label');

            expect(label).toHaveLength(2);
            expect(label.at(0).text()).toEqual('Email');
        });

        it('contains text input for email', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a" 
                                        passowrd="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(0).props().id).toEqual('email');
            expect(input.at(0).props().placeholder).toEqual('Email');
        });

        it('lets component manage email value', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a@test.com" 
                                        passowrd="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(0).props().value).toEqual('a@test.com');
        });

        
        it('has type of text', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a@test.com" 
                                        password="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(0).props().type).toEqual('text');
        });

        it('calls correct callback onChange', () => {
            let mock = jest.fn();
            let onChange = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a@test.com" 
                                        passowrd="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={onChange}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(0).props().onChange).toEqual(onChange);
        }); 
    });
    
    describe('password input Tests', () => { 
        it('contains label', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a" 
                                        password="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let label = wrapper.find('label');

            expect(label).toHaveLength(2);
            expect(label.at(1).text()).toEqual('Password');
        });

        it('contains text input for password', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a" 
                                        password="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(1).props().id).toEqual('password');
            expect(input.at(1).props().placeholder).toEqual('Password');
        });

        it('lets component manage password value', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a@test.com" 
                                        password="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(1).props().value).toEqual('thepassword');
        });

        it('has type of password', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a@test.com" 
                                        password="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={mock}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(1).props().type).toEqual('password');
        });

        it('calls correct callback onChange', () => {
            let mock = jest.fn();
            let onChange = jest.fn();
            const wrapper = shallow(<LoginForm 
                                        email="a@test.com" 
                                        passowrd="thepassword" 
                                        onSubmit={mock} 
                                        onEmailChange={mock}
                                        onPasswordChange={onChange}
                                        errorMsg="some_message"/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(2);
            expect(input.at(1).props().onChange).toEqual(onChange);
        }); 
    });

    describe('submit button Tests', () => {  
       it('contains submit button', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                    email="a@test.com" 
                                    passowrd="thepassword" 
                                    onSubmit={mock} 
                                    onEmailChange={mock}
                                    onPasswordChange={mock}
                                    errorMsg="some_message"/>);

            let button = wrapper.find('button');

            expect(button).toHaveLength(1);
        });

        it('has correct text on submit button', () => {
            let mock = jest.fn();
            const wrapper = shallow(<LoginForm 
                                    email="a@test.com" 
                                    passowrd="thepassword" 
                                    onSubmit={mock} 
                                    onEmailChange={mock}
                                    onPasswordChange={mock}
                                    errorMsg="some_message"/>);

            let button = wrapper.find('button');

            expect(button.text()).toEqual('Sign In');
        });

        it('calls correct callback onClick', () => {
            let mock = jest.fn();
            let onSubmit = jest.fn();
            const wrapper = shallow(<LoginForm 
                                    email="a@test.com" 
                                    passowrd="thepassword" 
                                    onSubmit={onSubmit} 
                                    onEmailChange={mock}
                                    onPasswordChange={mock}
                                    errorMsg="some_message"/>);

            let button = wrapper.find('button');

            expect(button).toHaveLength(1);
            expect(button.props().onClick).toEqual(onSubmit);
        }); 
    });
});