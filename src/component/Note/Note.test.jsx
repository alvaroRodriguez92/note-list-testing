import Note from "./Note"
import {render} from '@testing-library/react'
import {beforeEach,test,describe,expect} from "@jest/globals"

let componentNote;

beforeEach(()=>{
    componentNote = render(<Note/>)
})

describe(Note, ()=>{
    test("The component should render",()=>{
        expect(componentNote).toBeDefined()
    })

    //No se puede hacer lo siguiente sin sin simular el login:

    // test("It should welcome the user", ()=>{
    //     const welcome = screen.getAllByText("Welcome")
    //     expect(welcome).toBe()
    // })
})