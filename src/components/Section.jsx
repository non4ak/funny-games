export default function Section({ heading, children }) {
    return <>
        <h3 className="text-center text-2xl text-stone-600 font-medium mb-12">{heading}</h3>
        {children}
    </>
}   