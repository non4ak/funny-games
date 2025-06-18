export default function Section({ heading, children }) {
    return <>
        <h1 className="text-[3.5rem] text-center pt-8 font-medium">{heading}</h1>
        {children}
    </>
}   