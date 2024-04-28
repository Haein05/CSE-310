import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class SimpleTodoList extends Application {

    @Override
    public void start(Stage primaryStage) {
        // Setting the title of the window
        primaryStage.setTitle("Simple To-Do List");

        // ListView to display tasks
        ListView<String> listView = new ListView<>();
        
        // Buttons for adding and deleting tasks
        Button addButton = new Button("Add Task");
        Button deleteButton = new Button("Delete Task");

        // Action handler for adding a task
        addButton.setOnAction(e -> {
            TextInputDialog dialog = new TextInputDialog();
            dialog.setTitle("Add New Task");
            dialog.setHeaderText("New Task");
            dialog.setContentText("Enter task description:");
            Optional<String> result = dialog.showAndWait();
            result.ifPresent(task -> listView.getItems().add(task));  // Add the task to the list if input is present
        });

        // Action handler for deleting a selected task
        deleteButton.setOnAction(e -> {
            int selectedIdx = listView.getSelectionModel().getSelectedIndex();
            if (selectedIdx != -1) {  // Check if an item is actually selected
                listView.getItems().remove(selectedIdx);
            }
        });

        // Layout setup
        VBox layout = new VBox(10);  // VBox with spacing between controls
        layout.getChildren().addAll(listView, addButton, deleteButton);

        // Setting the scene and showing the stage
        Scene scene = new Scene(layout, 300, 250);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}