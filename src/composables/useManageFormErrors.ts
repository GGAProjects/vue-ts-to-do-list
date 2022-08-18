import { watch, ref, App, createApp } from "vue";
import ErrorMessage from "@/components/General/ErrorMessage";

interface ErrorObject {
	container: HTMLElement;
	name: string;
	element: App<Element>
}

const useManageFormErrors = (
	model: any,
	parentInputContainer = "custom-input-container"
) => {
	const errorsObjects = ref<Array<ErrorObject>>([]);

	const clearErrorObject = (errorElement: ErrorObject, index: number | null) => {
		errorElement.element.unmount();
		if (index) {
			errorsObjects.value.splice(index, 1);
		}
	};
	const clearErrorsObjects = () => {
		errorsObjects.value.forEach((element: ErrorObject) => {
			clearErrorObject(element, null);
		});
		errorsObjects.value = [];
	};
	const checkErrorByName = (name: string, element: string) => {
		if (element !== "") {
			const errorIndex = errorsObjects.value.findIndex(
				(error: any) => error.name === name
			);
			const errorElement = errorsObjects.value[errorIndex];
			if (errorElement) {
				clearErrorObject(errorElement, errorIndex);
			}
		}
	};
	const clearErrors = ({
		currentModel = model,
		keyParent = "",
		indexParent = "",
	}) => {
		if (errorsObjects.value.length === 0) return;
		for (const key in currentModel) {
			if (Object.hasOwnProperty.call(currentModel, key)) {
				const element = currentModel[key];
				if (!element) continue;
				if (typeof element === "object") {
					if (!element.length) {
						clearErrors({
							currentModel: element,
							keyParent: key,
						});
						continue;
					}
					for (let index = 0; index < element.length; index++) {
						const subElement = element[index];
						clearErrors({
							currentModel: subElement,
							keyParent: key,
							indexParent: index.toString(),
						});
						continue;
					}
				} else {
					const currentName =
						keyParent === ""
							? key
							: indexParent !== ""
								? [keyParent, indexParent, key].join("_")
								: [keyParent, key].join("_");

					checkErrorByName(currentName, element);
				}
			}
		}
	};

	const createErrorComponent = (container: HTMLElement, errorMessage: string, name: string) => {
		if (errorsObjects.value.find((item: any) => item.name === name)) return;
		const div = document.createElement("div");
		const ErrorInstance = createApp(ErrorMessage, {
			message: errorMessage,
		});
		ErrorInstance.mount(div);
		container.append(div);
		errorsObjects.value.push({
			container,
			name,
			element: ErrorInstance,
		});
	};
	const showErrors = (form: HTMLElement, errors: any) => {
		clearErrorsObjects();
		for (const key in errors) {
			if (Object.hasOwnProperty.call(errors, key)) {
				const _key = key.replaceAll(".", "_");

				const currentInput =
					form.querySelector(`[name="${_key}"]`) ||
					form.querySelector(`.${_key}`);

				if (currentInput) {
					createErrorComponent(
						currentInput.closest(`.${parentInputContainer}`)!,
						errors[key][0],
						_key
					);
				}
			}
		}
	};

	watch(model, () => {
		clearErrors({});
	});

	return { showErrors, clearErrorsObjects };
};

export default useManageFormErrors;
